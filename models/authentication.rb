class Authentication

  def self.authenticated_ppl(data)
    authentication_list = ['Krzysztof Nowak', 'Agnieszka Bylica', 'Michał Bryndza', 'Filip Dyduch', 'Mateusz Mydlarz']
    authentication_list.include?(data[:full_name]) ? result = data : result = '-3' # no permission
    result
  end

  def self.authentication(params = {})

    if !params[:login].nil? && !params[:password].nil?
      ldap = Connector::Ldap.new(:login => params[:login],
                                 :password => params[:password])
      if ldap.authentication
        authenticated_ppl(ldap.data)
      else
        '-2' # wrong login/pass
      end
    else
      '-1' # nil in login/pass
    end

  end

end