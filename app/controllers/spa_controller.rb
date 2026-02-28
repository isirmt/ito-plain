class SpaController < ApplicationController
  def public
    render "home/index"
  end

  def private
    before_action :authenticate_user!
    render "home/index"
  end
end