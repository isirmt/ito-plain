class Api::ItemsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :set_item, only: [:show, :update, :destroy]

  def index
    items = policy_scope(Item).order(created_at: :desc)
    render json: items.as_json(
      only: [:id, :slug, :title, :description, :status, :created_at, :updated_at]
    )
  end

  def show
    authorize @item

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
    authorize Item

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
    authorize @item

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
    authorize @item

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
end