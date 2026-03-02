Rails.application.routes.draw do
  devise_for :users, skip: [ :registrations ]
  root "spa#public"

  get "/d", to: "spa#public"
  get "/d/:id", to: "spa#public"
  get "/my", to: "spa#private"
  get "/my/*path", to: "spa#private"

  namespace :api do
    resources :items, only: [:index, :show, :create, :update, :destroy]
    resource :session, only: [:show]
  end
end
