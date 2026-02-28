Rails.application.routes.draw do
  devise_for :users, skip: [ :registrations ]
  root "spa#public"

  get "/d/:id", to: "spa#public"

  authenticated :user do
    get "/my", to: "spa#private"
    get "/my/*path", to: "spa#private"
  end

  namespace :api do
    resources :items, only: [:index, :show]
    resources :session, only: [:show]

    namespace :my do
      resources :items
    end
  end
end
