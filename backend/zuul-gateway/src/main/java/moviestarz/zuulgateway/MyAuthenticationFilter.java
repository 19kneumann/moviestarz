package moviestarz.zuulgateway;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.Base64;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;
import org.springframework.web.bind.annotation.CrossOrigin;

public class MyAuthenticationFilter extends ZuulFilter {
	
	private static final String USERNAME = "Admin";
	private static final String PASSWORD = "pass";

	@Override
	public boolean shouldFilter() {
		return true;
	}

	@Override
	public Object run() throws ZuulException {
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		RequestContext ctx = RequestContext.getCurrentContext();
		HttpServletRequest req = ctx.getRequest();
		//System.out.println("Zuul received a request from " + req.getRemoteAddr());
		//System.out.println("Request received for url: " + req.getRequestURL());
		//System.out.println("Zuul received a request at " + timestamp);
		System.out.println("Zuul received a request at " + timestamp + " for url " + req.getRequestURL() + " from " + req.getRemoteAddr());
		String headerValue = req.getHeader("Authorization");
		System.out.println(headerValue);
		String username="", password="";
		if(headerValue != null) {
			String[] parts = headerValue.split(" ");
			System.out.println(Arrays.toString(parts));
			if(parts.length == 2) {
				String encodedAuth = parts[1].trim(); //"Zyt76l="
				String decodedAuth = new String(Base64.getDecoder().decode(encodedAuth));
				String[] pieces = decodedAuth.split(":");
				System.out.println(Arrays.toString(pieces));
				if(pieces.length == 2) {
					username = pieces[0].trim();
					password = pieces[1];
					System.out.println(username);
					if(!USERNAME.equalsIgnoreCase(username) || !PASSWORD.equals(password)) {
						throw new RuntimeException("Bad credentials");
					}
				}
			}
		}
		return null;
	}

	@Override
	public String filterType() {
		return "pre";
	}

	@Override
	public int filterOrder() {
		return 1;
	}

}
