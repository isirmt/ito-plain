class Tag < ApplicationRecord
  has_many :item_taggings, dependent: :destroy
  has_many :items, through: :item_taggings

  validates :name, presence: true, uniqueness: true
  validates :slug, presence: true, uniqueness: true
end