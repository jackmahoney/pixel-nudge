#cli hack, see src for main project

input = ARGV[0] || "examples/goat.jpg"
steps = ARGV[1] || 10
delay = ARGV[2] || 10

`mkdir -p gen`

(0..steps.to_i).each do |index|

  output = "gen/out-#{index}.jpg";
  p "Generating #{output}"
  p `node src/cli.js #{input} #{output}`

end

p "Creating gif"
`convert -delay #{delay} -loop 0 gen/out-*.jpg gen/animation-#{Time.now.to_i}.gif`
`rm gen/*.jpg`