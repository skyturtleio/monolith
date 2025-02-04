# Monolith

An example project for a modern monolith using Phoenix, Inertia.js, React. 
You can find the application running at https://monolith.skyturtle.io/

It is deployed to a self-hosted VPS using [Coolify](https://www.coolify.io/). A healthcheck has been enabled using a custom plug module, `MonolithWeb.Healthcheck`.

On the home page you will see a basic navbar with three links: `Home`, `Counter`, and `Default`. `Home` and `Counter` are React components and can be found within the `assets` directory. The `Home` page receives props from a standard Phoenix controller. The navigation for the links between these pages uses Inertia with `prefetch` enabled. `Default` is the default home page that ships with `mix phx.new my_app`.

## Development

This project is built with Phoenix 1.7.19, Inertia v2, and React 19. Third-party packages are installed using `npm` so you will need to have Node.js installed.

To start your Phoenix server:

  * Run `mix setup` to install and setup dependencies
  * Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser. The home page is a React component being rendered by Inertia.

## Inertia.js Setup

The official setup instructions can be found on HexDocs for the [Inertia.js Phoenix Adapter](https://hexdocs.pm/inertia/readme.html#installation). These setup instructions give a high-level overview of the steps. The details below are to help out my future self and also clariy some questions I had as I was going through the instructions.

### Optional - Freedom Formatter

I like trailing commas so I installed Freedom Formatter

- Add [Freedom Formatter](https://github.com/marcandre/freedom_formatter) for trailing commas.

### Server-side setup

Setting up the Inertia.js Phoenix Adapter

- [Installation instructions](https://hexdocs.pm/inertia/readme.html#installation)

#### Steps

- Add `:inertia` to your dependencies. Don't forget to run `mix deps.get` afterwards
- Add Inertia's server-side configuration to `config.exs`

When adding the `config :inertia`, remember that the `endpoint:` is your application's web namespace e.g. `MonolithWeb` not `Monolith`.

- Add Inertia helpers for Controller and HTML to `MonolithWeb`
- Add `Inertia.Plug` to your browser pipeline in your `router.ex`
- Update `<head>` component in the root layout so the client-side library will keep the title in sync


### Client-side setup

#### Steps

- Install the Inertia.js library for your frontend library as well as the frontend library itself. In this case, we will be using React. Remember, everything "frontend" related will be done in the `assets` directory.
- Initialize the client-side library in `app.jsx`. We renamed `app.js` to `app.jsx` since we are using React.
- Update the `:esbuild` config to bump up the version number. Run `mix esbuild.install` if the version number was changed.
- Optional if you want code splitting and to use ESM: change the `esbuild` to use:

```elixir
# config.exs

~w(js/app.jsx --bundle --chunk-names=chunks/[name]-[hash] --splitting --format=esm --target=es2020 --outdir=../priv/static/assets --external fonts/* --external:/images/*),
```

- Tailwind v4.0 no longer requires a configuration file, but they still allow it for backwards compatibility. If you are using Tailwind < v4.0, update the `tailwind.config.js` content to include `jsx` files:

```javascript
// `assets/tailwind.config.js`
module.exports = {
  content: [
    "./js/**/*.js",
    "./js/**/*.jsx",
    "../lib/monolith_web.ex",
    "../lib/monolith_web/**/*.*ex"
  ],
```

## Render a response using a React component

This repo has an example route at `/inertia`. This page renders a React component, `MessagePage`, that is passed the props `message` and `name`. Things to note:

- We created a specific controller here (`ReactPageController`), but you don't necessarily need to do that. You can render an Inertia response from an controller since we added the `Inertia.Controller` helpers into `MonolithWeb`.
- As your frontend gets more complicated (e.g. more pages, components), you may want to break out more directories and use a `Layout` component. The Inertia doc example show using a `Layout` component.
- You will need to `import React` into every `jsx` component. This is because of esbuild. You can [auto-import React](https://esbuild.github.io/content-types/#auto-import-for-jsx) by adding the `--jsx=automatic` flag to the esbuild config in `confix.exs`. From the docs:

> Keep in mind that this also completely changes how the JSX transform works, so it may break your code if you are using a JSX library that's not React. 



### Steps

- Add the route to `router.ex`

```elixir
  scope "/", MonolithWeb do
    pipe_through :browser

    get "/", PageController, :home
    get "/inertia", ReactPageController, :index
  end
```

- Places the pages (React components) you want to render in `assets/js/pages/`

```javascript
// assets/js/pages/MessagePage.jsx

import React from "react";
import { Head } from '@inertiajs/react'

export default function MessagePage({ message, name }) {
  return (
    <div>
      <Head title="Welcome" />
      <h1 class="text-2xl font-bold underline">{message}</h1>
      <p class="pt-4">Hello <span class="text-green-600 font-semibold">{name}</span>, welcome to your first Inertia app!</p>
    </div>
  )
}

```
- In your controller, render the response using `render_inertia/1`

```elixir
  def index(conn, _params) do
    conn
    |> assign_prop(:message, "Hello from Inertia!")
    |> assign_prop(:name, "Turtle")
    |> render_inertia("MessagePage")
  end
```

## Server-side Rendering

Lesson learned: initially I tried using `--jsx=automatic` for the esbuild config so that I wouldn't have to import React into every file.

```elixir
~w(js/app.jsx --bundle --chunk-names=chunks/[name]-[hash] --splitting --format=esm --target=es2020 --jsx=automatic --outdir=../priv/static/assets --external:/fonts/* --external:/images/*),
```

However, when I started setting up SSR, I was getting an error that React was not defined:

```shell
[error] ** (Inertia.SSR.RenderError) React is not defined
ReferenceError: React is not defined
    at setup (/Users/leo/projects/monolith/priv/ssr.js:42041:54)
    at /Users/leo/projects/monolith/priv/ssr.js:19759:22
```

# Deployment

- create Dockerfile using mix release
- need to add Node.js to BUILDER **and** RUNNER image so that SSR works

Need it in the build stage since we installed third-party NPM packages
- in Coolify, create a new Project and select Docker file
- change Ports Exposes to 4000
- set environment variables DATABASE_URL, PHX_HOST, SECRET_KEY_BASE, POSTMARK_API_KEY (for when you set up email)
