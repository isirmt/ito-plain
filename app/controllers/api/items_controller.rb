class Api::ItemsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :set_item, only: [:show, :update, :destroy]

  def index
    items = Item.order(created_at: :desc)
    render json: items.as_json(
      only: [:id, :slug, :title, :description, :status, :created_at, :updated_at]
    )
  end

  def show
    render json: @item.as_json(
      only: [:id, :slug, :title, :description, :html, :css, :js, :status, :created_at, :updated_at],
      include: {
        tags: {
          only: [:id, :name, :slug]
        }
      }
    ), status: :ok
  end

  def create
    if Item.new(item_params).save
      render json: item.as_json, status: :created
    else
      render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @item.update(item_params)
      render json: @item.as_json, status: :ok
    else
      render json: { errors: @item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
  end

  private

  def set_item
    @item = Item.find(params[:id])
  end

  def item_params
  end

  def item_params
    params.require(:item).permit(
      :slug,
      :title,
      :description,
      :html,
      :css,
      :js,
      :status,
    )
end