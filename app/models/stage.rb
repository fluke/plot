class Stage < ActiveRecord::Base
	has_many :hotspots, :dependent => :destroy
end
