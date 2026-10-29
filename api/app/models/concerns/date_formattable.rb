# frozen_string_literal: true

module DateFormattable
  extend ActiveSupport::Concern

  # https://pubs.opengroup.org/onlinepubs/009695399/functions/strftime.html

  included do
    def created_at_ymd
      created_at.strftime('%F')
    end
  end
end
