defmodule MonolithWeb.ReactPageController do
  use MonolithWeb, :controller

  def welcome(conn, _params) do
    conn
    |> assign_prop(:message, "Hello from Inertia!")
    |> assign_prop(:name, "Turtle")
    |> render_inertia("WelcomePage")
  end

  def about(conn, _params) do
    conn
    |> render_inertia("AboutPage")
  end
end
