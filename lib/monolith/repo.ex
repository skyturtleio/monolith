defmodule Monolith.Repo do
  use Ecto.Repo,
    otp_app: :monolith,
    adapter: Ecto.Adapters.Postgres
end
