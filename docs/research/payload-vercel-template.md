# Оценка `payload-vercel-template` для Cure HHT

Дата: 27 октября 2026. Основание: [issue #56](https://github.com/curehht/curehht.github.io/issues/56), текущий код проекта и [шаблон на коммите `fb296ae`](https://github.com/alexbaumgertner/payload-vercel-template/tree/fb296ae79084c3c007542f01959f8c4133fc2f3b).

## Решение

**Не переносить весь сайт на шаблон ради issue #56.** Задача требует два результата: динамическое приложение на Vercel с доменом `curehht-ru.org` и статический публичный сайт на `curehht.github.io` через GitHub Actions. Шаблон рассчитан на одно динамическое приложение Vercel. Он может быть источником отдельных решений для CMS и эксплуатации, если появится самостоятельная задача заменить редакторскую систему, но не является готовым основанием для двух сборок.

## Сравнение

| Вопрос | Текущий проект | Шаблон | Вывод |
| --- | --- | --- | --- |
| Динамический Vercel | Next.js 16, PostgreSQL/Drizzle, NextAuth, Vercel Blob; серверные маршруты уже есть | Next.js 16, Payload 3, PostgreSQL/Neon, Vercel Blob | Переход не нужен для размещения на Vercel. Настройки проекта и домена Vercel надо проверять отдельно. |
| Статический GitHub Pages | В `next.config.js` есть `output: 'export'` по `NEXT_EXPORT_TYPE`; workflow удаляет `/admin` и `/api`, строит `out` и публикует `gh-pages` | Нет экспортного режима и workflow для GitHub Pages; есть Payload admin/API, Server Actions, cookies, proxy, ISR и серверные заголовки | Для шаблона понадобится отдельная публичная сборка и способ обновлять её после публикации контента. Нынешний путь ближе к цели, хотя его успешность в CI здесь не проверялась. |
| Контент | `pages`, `documents` с блоками, `news_articles`, роли/права; публичные страницы и маршруты новостей | `changelog`, `waitlist`, `users`, `media`; стартовая страница SaaS | Нужно проектировать коллекции, переносить данные и переписывать публичные страницы и редакторские сценарии. |
| Доступ редакторов | Google OAuth через NextAuth и Drizzle | Вход по одноразовому коду через Resend | Нужна отдельная миграция учётных записей, ролей и правил доступа либо сохранение нынешней схемы. |
| Обновление статического сайта | Данные читаются во время сборки GitHub Actions из PostgreSQL | Изменения контента инвалидируют кеш динамического Next.js | Для GitHub Pages потребуется запускать новую сборку по расписанию или webhook; `revalidatePath` на Vercel её не обновит. |

Ограничения экспорта подтверждает [документация Next.js](https://nextjs.org/docs/app/guides/static-exports): cookies, Server Actions, proxy, ISR и маршруты, зависящие от запроса, не работают в `output: 'export'`. В шаблоне они используются в [конфигурации](https://github.com/alexbaumgertner/payload-vercel-template/blob/fb296ae79084c3c007542f01959f8c4133fc2f3b/next.config.ts), [Payload API](https://github.com/alexbaumgertner/payload-vercel-template/blob/fb296ae79084c3c007542f01959f8c4133fc2f3b/src/app/%28payload%29/api/%5B...slug%5D/route.ts), [действии формы](https://github.com/alexbaumgertner/payload-vercel-template/blob/fb296ae79084c3c007542f01959f8c4133fc2f3b/src/features/waitlist/actions.ts) и [локализационном proxy](https://github.com/alexbaumgertner/payload-vercel-template/blob/fb296ae79084c3c007542f01959f8c4133fc2f3b/src/proxy.ts).

## Что важно исправить для #56 в существующей архитектуре

1. В `.github/workflows/build.yml` копируется `CNAME` в статический артефакт; сейчас `CNAME` содержит `curehht-ru.org`. Это направляет домен к GitHub Pages, тогда как issue #56 назначает его динамическому Vercel. Для статического `curehht.github.io` не следует публиковать этот `CNAME`.
2. Проверить, что Vercel строит серверную версию без `NEXT_EXPORT_TYPE=export`, а GitHub Actions стабильно создаёт и публикует только публичный `out` без admin/API и с доступом к данным на этапе сборки.
3. Привести установку зависимостей в workflow к `pnpm` с зафиксированным `pnpm-lock.yaml`: сейчас он запускает `npm install`, хотя `package.json` задаёт pnpm 10.
4. Согласовать спецификацию развёртывания: `ROADMAP.md` сейчас предлагает статический `curehht-ru.org` и динамический `beta.curehht-ru.org`, что противоречит issue #56. До изменения DNS и CI нужно выбрать целевую схему.

## Состояние синхронизации с `origin`

Удалённый `origin/dev` на момент проверки — `b1b0efdd5c39b2354ee5f00300abec99826de357` (слияние PR #94). Локальный `HEAD` — `23082cf91f7847af4af87580286c04efef5acfe0`. Оба коммита имеют одно и то же дерево `6e9b28201be63345732a7469b64c9bb078890c65`, поэтому содержимое файлов актуально. Запись Git-ссылок в этом рабочем окружении недоступна: общий `.git` находится в каталоге только для чтения, и `git fetch` не может записать `FETCH_HEAD`. Проверка удалённой ветки сделана через `git ls-remote` и отдельный временный клон.
