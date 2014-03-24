# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'sass', :input => 'source/_sass', :output => 'source/css'
guard 'sculpin' do
    watch(%r{^source/.*\.(php|md|html|css|js|png|jpg|gif)$})
end

guard 'livereload' do
    watch(%r{public_dev/*})
end

notification :growl
