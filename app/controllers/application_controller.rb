class ApplicationController < ActionController::Base
  # after_action :verify_authorized, except: :index
  # after_action :verify_policy_scoped, only: :index

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  include Pundit::Authorization

  rescue_from Pundit::NotAuthorizedError do
    render json: { error: "Forbidden" }, status: :forbidden
  end
end
