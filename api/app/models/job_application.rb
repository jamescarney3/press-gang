# frozen_string_literal: true

class JobApplication < ApplicationRecord
  belongs_to :user
  belongs_to :company
end
