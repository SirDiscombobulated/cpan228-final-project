package com.humber.backend;


import com.humber.backend.services.ItemService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication //Looks for ALL THE BEANS
public class BackendApplication {

	private final ItemService itemService;

	//constructor injection - injecting service
	public BackendApplication(ItemService itemService) {
		this.itemService = itemService;
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}


}
