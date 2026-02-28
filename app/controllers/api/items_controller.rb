class Api::ItemsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :set_item, only: [:show, :update, :destroy]

  def index
    items = Item.where(status: :published).order(created_at: :desc)
    render json: items.as_json(
      only: [:id, :slug, :title, :description, :status, :created_at, :updated_at]
    )
  end

  def show
    can_access = @item.published? || (user_signed_in? && @item.user_id == current_user.id)
    unless can_access
      render json: { error: "Unauthorized" }, status: :unauthorized
      return
    end
    render json: @item.as_json(
      only: [:id, :slug, :title, :description, :html, :css, :js, :status, :created_at, :updated_at],
      include: {
        tags: {
          only: [:id, :name, :slug]
        },
        user: {
          only: [:id, :email]
        }
      }
    ), status: :ok
  end

  def create
    item = current_user.items.build(item_params)

    if item.save
      render json: item.as_json(
        include: {
          tags: {
            only: [:id, :name, :slug]
          },
          user: {
            only: [:id, :email]
          }
        }
      ), status: :created
    else
      render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    unless is_owner?(@item)
      render json: { error: "Unauthorized" }, status: :unauthorized
      return
    end

    if @item.update(item_params)
      render json: @item.as_json(
        include: {
          tags: {
            only: [:id, :name, :slug]
          },
          user: {
            only: [:id, :email]
          }
        }
      ), status: :ok
    else
      render json: { errors: @item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    unless is_owner?(@item)
      render json: { error: "Unauthorized" }, status: :unauthorized
      return
    end

    @item.destroy
    head :no_content
  end

  private

  def set_item
    @item = Item.find_by!(slug: params[:id])
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

  def is_owner?(item)
    user_signed_in? && item.user_id == current_user.id
  end
end