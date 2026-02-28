class SpaController < ApplicationController
  before_action :authenticate_user!, only: :private

  def public
    render "home/index"
  end

  def private
    render "home/index"
  end
end
