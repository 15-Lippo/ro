Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :news, only: [:index]
    resource :session, only: [:create, :destroy]
    resources :transactions, only: [:create]
    resources :users, only: [:create]
    get '/users/:id/info', to: 'sessions#info'
  end

end
