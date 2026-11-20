# frozen_string_literal: true

class Question < ApplicationRecord
  include PgSearch::Model
  include DateFormattable

  belongs_to :user
  belongs_to :job_application

  pg_search_scope :search_by_prompt_and_answer,
                  against: %i[prompt answer]
end
