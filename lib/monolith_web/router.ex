defmodule MonolithWeb.Router do
  use MonolithWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {MonolithWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    # A plug for detecting Inertia.js requests and preparing the connection accordingly
    plug Inertia.Plug
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", MonolithWeb do
    pipe_through :browser

    get "/", ReactPageController, :welcome
    get "/about", ReactPageController, :about
    get "/counter", ReactPageController, :counter
    get "/default", PageController, :home
  end

  # Other scopes may use custom stacks.
  # scope "/api", MonolithWeb do
  #   pipe_through :api
  # end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:monolith, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: MonolithWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
