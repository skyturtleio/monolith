defmodule MonolithWeb.ReactPageController do
  use MonolithWeb, :controller

  def index(conn, _params) do
    conn
    |> assign_prop(:message, "Hello from Inertia!")
    |> assign_prop(:name, "Turtle")
    |> render_inertia("MessagePage")
  end
end
