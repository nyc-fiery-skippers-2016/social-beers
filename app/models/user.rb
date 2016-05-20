class User < ActiveRecord::Base
  has_many :favorites
  has_many :favorited_businesses, through: :favorites, source: :business

  has_secure_password
  validates :username, :email, :password, presence: true
  validates :username, :email, uniqueness: true
  validates :email, format: { with: /\A([\w+\-]\.?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i }
end
