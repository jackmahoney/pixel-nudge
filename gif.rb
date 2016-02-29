#cli hack, see src for main project

input = ARGV[0] || "examples/goat.jpg"
steps = ARGV[1] || 10
delay = ARGV[2] || 10

animation_output = input + ".gif"

`mkdir -p gen`

p "Glitching #{input} to #{animation_output}"

(0..steps.to_i).each do |index|

  output = "gen/out-#{index}.jpg";
  p "Generating #{output}"
  p `node src/cli.js #{input} #{output}`

end

p "Creating gif"
`convert -delay #{delay} -loop 0 gen/out-*.jpg #{animation_output}`
`rm gen/*.jpg`