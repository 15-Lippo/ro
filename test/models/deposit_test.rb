# == Schema Information
#
# Table name: deposits
#
#  id           :bigint(8)        not null, primary key
#  user_id      :integer          not null
#  amount       :float            not null
#  deposit_date :datetime         not null
#

require 'test_helper'

class DepositTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
