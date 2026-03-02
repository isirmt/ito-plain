class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :validatable

  has_many :items, dependent: :restrict_with_exception

  validates :username, presence: true, uniqueness: true
  validates :username, format: { with: /\A[a-zA-Z0-9_]+\z/, message: "ONLY ALLOWS letters, numbers, and underscores" }
end
