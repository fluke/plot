class HotspotSerializer < ActiveModel::Serializer
  attributes :id, :tlx, :tly, :brx, :bry, :stage_id, :name
end
