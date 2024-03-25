## Запуск в режиме разработки

npm run dev

## Продакшн

npm run build

## Генерация zip-архива в режиме production

npm run zip

## Деплой на ftp-сервер

npm run deploy

## Структура sass

```
/assets/scss/
    /components/ - компоненты
    /layout/ - макеты
    /blocks/ - общие блоки
    /lib/ - стили сторонних библиотек
    /pages/ - стили для страниц
    /uttils/ - миксины и функции sass
    _fonts.scss - шрифты
    _reset.scss - файл для сброса стилей
    _vars.scss - переменные sass
    style.scss
```

## Структура проекта

/includes/ содержит в себе простые компоненты. /components/ содержит в себе макро компоненты. Пример
макро компонента и его использование:

```
{% macro icon(props) %}
	<svg {% if props.class %} class="{{props.class}}" {% endif %}>
		<use xlink:href="#{{props.name}}"></use>
	</svg>
{% endmacro %}
```

### Импорт

```
{% from "../components/icon.twig" import twig %}
```

### Использование

```
{{
    icon({
        name: 'user',
        class: 'user-icon'
    })
}}
```

## Хранение данных

Все данные хранятся в data.json. Файл обязателен и должен содержать в себе объект

Пример использования:

```
// data.json
{
    "articles": [
        {
            "title": "Заголовок статьи 1"
        },
        {
            "title": "Заголовок статьи 2"
        },
        {
            "title": "Заголовок статьи 3"
        }
    ]
}
```

```
<div class="articles-grid">
    {% for i in articles %}
        <article class="cart">
            <h3>{{ articles[loop.index - 1].title }}</h3>
            <p>...</p>
            <a href="#">Читать</a>
        </article>
    {% endfor %}
</div>
```

## Оптимизация изображений

Формат .webp создается для каждого изображения по умолчанию. Для сжатия изображения необходимо
присвоить переменной imageOptimize значение true (../gulp/tasks/images.js)
