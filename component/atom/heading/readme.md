# Heading: пилот ContractStory

История описана в `index.story.ts` через `satisfies ContractStory<RecipeHeading>`.
Используется стандартный StoryCanvas; legacy Story и собственная панель удалены.
Текст передаётся в `args.text`, без `content` и без children, перекрывающего text.
Все args и presets допускают structured clone. `level` — число 1–6; select
возвращает исходную опцию, а не строковое представление DOM option.

## Сценарии

- Default сохраняет исходный текст и оформление интерактивного примера.
- Level 1–6 сохраняют семантическую лестницу и её прежние размеры 8/5/4.
- Family, Size и Weight сохраняют все примеры старых таблиц как отдельные presets.
- Long text, Multiline text и Clamped text покрывают переносы и lineClamp.
- Centered serif и Disabled показывают композицию параметров оформления.
- Controls используют существующие TOKEN_COLOR_TONE, TOKEN_FONT_SIZE,
  TOKEN_FONT_WEIGHT, TOKEN_FONT_FAMILY, TOKEN_LINE_HEIGHT, TOKEN_LETTER_SPACING.
  Для level, textTransform и textAlign отдельных констант не обнаружено.

Прежняя опция tone=accent отсутствует в TokenColorTone и в resolver: она не
перенесена. `lineClamp=0` уже отключает clamp в runtime, адаптер не нужен.
Multiline text содержит настоящие переводы строк; обычный HTML whitespace
схлопывает их. Для принудительных переносов потребитель может передать нативный
style с `white-space: pre-line`, но история не добавляет это в RecipeHeading.

## Проверки и границы

Целевые render-тесты: `test/render/heading-story/index.test.ts`.
Запуск из umbrella `stylist-svelte`:

```sh
yarn test run modules/design-system/typography/test/render/heading-story/index.test.ts
```

Тесты проверяют clone всех presets, реальный h-тег после mount, numeric select
через настоящие StoryControls, clone сообщения `stylist:story-args`, смену текста,
выбор preset/reset, приоритет children над text, class/style/native attributes,
light/dark переменные StoryCanvas и независимость соседнего preview.
Клонированное сообщение в render-тесте передаётся в canvas через rerender:
это не проверка самого iframe receiver. jsdom не проверяет геометрию и CSS layout.

Проверка TypeScript ограничена story и этим тестом с импортируемыми зависимостями
и настройками umbrella tsconfig; глобальные errors CLI и генерация не запускались.

Результат пилота 2026-10-17: 5 render-тестов прошли; целевой TypeScript Program
для story/test с транзитивными зависимостями дал 0 diagnostics. Форматирование
проверено только для изменённых файлов.

Дополнительно Playwright + установленный Chrome проверили реальные StoryControls,
StoryCanvas, Heading и HtmlH2. Стенд компилировался Vite в памяти (`write: false`),
без dist и записи нового приложения. После mount проверены select 1–6, text,
настоящее window.postMessage с числовым level и выбор Long text/Clamped text.
Это отдельный стенд с прямой передачей environment, не запуск `/preview`.
Попытки проверки через временный HTTP-стенд завершились timeout при навигации;
проверки geometry выполнены в автономной странице с компиляцией в памяти.

| Viewport / mode | Long text: высота / line-height | Цвет Heading       | Переполнение |
| --------------- | ------------------------------- | ------------------ | ------------ |
| 320 px / light  | 616 / 44 px                     | rgb(15, 23, 42)    | Нет          |
| 320 px / dark   | 616 / 44 px                     | rgb(248, 250, 252) | Нет          |
| 1440 px / light | 132 / 44 px                     | rgb(15, 23, 42)    | Нет          |
| 1440 px / dark  | 132 / 44 px                     | rgb(248, 250, 252) | Нет          |

Соседний preview оставался light во всех четырёх случаях. Clamp при 320 px:
высота 80 px, line-height 40 px, computed -webkit-line-clamp=2. HtmlH2 со skin:
font-size 32 px, font-weight 600, верхний margin 24 px. Ошибок страницы не было.
Iframe handshake, полномасштабный explorer и его fullscreen UI этим стендом
не проверены; это оставшаяся интеграционная приёмка после manifest.

## Блокеры интеграции в explorer

1. В `domain/const/preset/file` нет композиции для точного набора файлов Heading:
   `index.story.ts`, `index.svelte`, `index.ts`, `readme.md`, `state.svelte.ts`.
   Существующий DEFINED_STORY_COMPONENT содержит только первые три файла.
   Перед генерацией владелец sandbox должен добавить отдельный preset, например:

   ```ts
   DOCUMENTED_DEFINED_REACTIVE_STORY_COMPONENT: {
     type: 'component',
     files: ['index.story.ts', 'index.svelte', 'index.ts', 'readme.md', 'state.svelte.ts']
   }
   ```

   Это подготовленное описание изменения, а не правка sandbox в этом пилоте.
   Генератор требует полного совпадения композиции. Без нового preset нельзя
   утверждать, что manifest успешно обновится и explorer покажет новую story.

2. `resolvePreviewSkin` разрешает environment только путям `html/component/`.
   `domain-file-preview` отправляет `{}` для typography, а `/preview` передаёт
   `environment: undefined` в StoryCanvas. Отдельный переключатель окружения
   light/dark и включение HTML skin для Heading через этот путь недоступны.
   Наследуемая тема sandbox зеркалируется отдельно сообщением stylist:viewport.
   Для сравнения со skin можно использовать целевой стенд, не менять Heading.

После добавления preset Дмитрий запускает `yarn stylist:manifest` из
`D:\2026\cloudflare\lankatour.ru`. Затем нужно проверить explorer, выбор новой
`index.story.ts`, отсутствие ссылки на удалённую legacy story, controls → iframe,
fullscreen/mobile и наследование обеих тем. `yarn stylist:index` для одной
story/readme не требуется: story/test не экспортируются, публичный API не менялся.
Новые tests также не требуют barrels. Dist, публикация и миграция потребителей
в эту работу не входят.

## Heading и HtmlH1–HtmlH6 со skin

| Аспект              | Heading                                                                   | HtmlH1–HtmlH6 + skin                              |
| ------------------- | ------------------------------------------------------------------------- | ------------------------------------------------- |
| DOM                 | Один динамический h1–h6, default h2                                       | Фиксированный нативный тег каждой обёртки         |
| Контент             | text или children; children имеет приоритет                               | children; строка через HtmlNode content в story   |
| Props               | RecipeHeading плюс нативные HTMLAttributes в реализации                   | Нативные HTMLAttributes и bind:element            |
| Типографика         | Размер, вес, семейство, интервалы, align, transform и clamp на экземпляре | Базовая шкала по тегу и CSS токены окружения      |
| Цвет                | Семантический tone, disabled, ariaLabel alias                             | Наследование цвета; нативный aria-label           |
| Оформление без args | 1.5rem / 700 / 1.2, margin 0                                              | h2: 2rem / semibold / tight, margin 1.5rem 0.5rem |
| Область действия    | Класс компонента и inline declarations                                    | Scoped zero-specificity CSS в @layer html         |

HTML skin уже импортирует TYPOGRAPHY_PRESET.body/heading/caption/code из typography.
Наличие skin поэтому не делает typography независимым дублем html. Семантика h2
совпадает, визуальные defaults различаются. `level` Heading определяет семантику,
но сам по себе не меняет размер; skin назначает размеры h1–h6 и uppercase для h6.
При совместном применении классы/inline Heading перекрывают часть skin, а его
неперекрытые свойства (например text-wrap: balance и h6 text-transform) сохраняются.

Самостоятельный контракт typography — управление оформлением конкретного
экземпляра через токены, независимость размера от ранга, text/children API,
clamp, tone/disabled и общие типографические пресеты. Нативные class/style уже
поддержаны реализацией Heading, но отсутствуют в RecipeHeading: это граница
типового контракта, которую пилот не меняет.

Потребители найдены, например, в landing/section-heading, landing/cases-section,
landing/workflow-section и wbd/user-management-page, wbd/audit-log-page.
Они используют text, level и class; замена на HtmlH2 потребовала бы переноса
контента в children, выбора нужного фиксированного компонента и сохранения CSS.

Рекомендация: сохранить Heading как композицию с этим контрактом и оставить
typography владельцем общих пресетов. Дублирование базовых значений можно
уменьшить общим preset/resolver после отдельного решения о совместимости
defaults; немедленное применение TYPOGRAPHY_PRESET.heading изменит 700/1.2 и
tracking существующих потребителей. Использование HtmlH1–HtmlH6 внутри Heading
возможно, но потребует выбора из шести компонентов и не уберёт resolver и API.
Динамический svelte:element сейчас проще. Удаление домена или массовая миграция
потребителей этим сравнением не обоснованы.

## Runtime-дефекты

В выполненных целевых render-сценариях дефектов реактивности Heading не выявлено.
Схлопывание переводов строк — нативное поведение HTML; оно не исправлялось.
Различия defaults со skin и отсутствие class/style в recipe зафиксированы выше;
это не исправления runtime в рамках истории. Блокеры host перечислены отдельно.
