# frozen_string_literal: true

class Comment < ApplicationRecord
  include DateFormattable

  belongs_to :commentable, polymorphic: true
  belongs_to :user
end
