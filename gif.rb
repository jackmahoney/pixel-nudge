#CLI hack, see src for main node project. It's messy here but you get the idea.
#Usage: ruby gif.rb <image.jpg> <steps> <delay> <shifts> <factor> <distance>
input = ARGV[0] || "examples/goat.jpg"
steps = ARGV[1] || 10
delay = ARGV[2] || 10

animation_output = input + ".gif"

`mkdir -p gen`

p "Glitching #{input} to #{animation_output}"

(0..steps.to_i).each do |index|

  output = "gen/out-#{index}.jpg";
  p "Generating #{output}"
  p `node src/cli.js #{input} #{output} #{ARGV[3]} #{ARGV[4]} #{ARGV[5]}`

end

p "Creating gif"
`convert -delay #{delay} -loop 0 gen/out-*.jpg #{animation_output}`
`rm gen/*.jpg`