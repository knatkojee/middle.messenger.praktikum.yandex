# Проект первого и второго спринтов на курсе мидл-фронтенд разработчик

## Технологии

- Handlebars
- Typescript
- Vite
- Netlify

## Запуск

Режим разработки
`"dev": "vite",`

Сборка
`"build": "tsc && vite build",`

Запуск собранной версии
`"preview": "vite preview",`

Сборка и запуск одной командой
`"start": "tsc && vite build && vite preview"`

Запуск eslint
`"lint": "eslint . --ext .ts,.tsx,.js,.jsx",`

Исправления ошибок eslint
`"lint:fix": "eslint . --ext .ts,.tsx,.js,.jsx --fix",`

Запуск stylelint
`"lint:styles": "stylelint **/*.css",`

Исправление ошибок stylelint
`"lint:styles:fix": "stylelint **/*.css --fix"`

## Netlify

Посмотреть рабочую версию приложения можно тут: https://deploy-preview-1--astonishing-dasik-53f712.netlify.app/

## Что нового

### Спринт 2

- Добавлен typescript
- Добавлен базовый класс Block, который является основой большинства компонентов
- Добавлены линтеры для JS и стилей
