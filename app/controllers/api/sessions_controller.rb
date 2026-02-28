class Api::SessionsController < ApplicationController
  def show
    if user_signed_in?
      render json: {
        signed_in: true,
        user: {
          id: current_user.id,
          email: current_user.email
        }
      }
    else
      render json: {
        signed_in: false,
        user: nil
      }, status: :unauthorized
    end
  end
end
