# frozen_string_literal: true

class JobApplication < ApplicationRecord
  include Commentable

  enum :status, %i[applied rejected stale in_progress offered declined], prefix: true

  belongs_to :user
  belongs_to :company

  accepts_nested_attributes_for :company

  def applied_date
    created_at.strftime('%F')
  end
end
