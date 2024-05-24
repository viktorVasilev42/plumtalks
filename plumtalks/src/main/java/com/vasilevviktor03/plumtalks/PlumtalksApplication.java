package com.vasilevviktor03.plumtalks;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class PlumtalksApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(PlumtalksApplication.class, args);
	}

}
