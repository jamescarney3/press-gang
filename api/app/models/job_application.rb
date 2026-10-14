# frozen_string_literal: true

class JobApplication < ApplicationRecord
  belongs_to :user
  belongs_to :company

  accepts_nested_attributes_for :company

  def applied_date
    created_at.strftime("%F")
  end
end
