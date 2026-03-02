class ItemPolicy < ApplicationPolicy
  def show?
    record.published? || owner?
  end

  def create?
    user.present?
  end

  def update?
    owner?
  end

  def destroy?
    owner?
  end

  class Scope < Scope
    def resolve
      if user.present?
        scope.where(status: :published).or(scope.where(user_id: user.id))
      else
        scope.where(status: :published)
      end
    end
  end

  private

  def owner?
    user.present? && record.user_id == user.id
  end
end