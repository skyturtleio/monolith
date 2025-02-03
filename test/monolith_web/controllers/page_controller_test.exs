defmodule MonolithWeb.PageControllerTest do
  use MonolithWeb.ConnCase

  describe "GET /" do
    test "renders the Welcome page React Component", %{conn: conn} do
      conn = get(conn, "/")
      assert inertia_component(conn) == "WelcomePage"
      assert %{name: "Turtle"} = inertia_props(conn)
    end
  end
end
