class Item < ApplicationRecord
  has_many :item_taggings, dependent: :destroy
  has_many :tags, through: :item_taggings
  belongs_to :user

  enum :status, {
    draft: 0,
    published: 1,
    archived: 2
  }

  validates :title, presence: true
end