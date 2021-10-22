package br.com.pati.cadastro.cliente.cadastrocliente.controler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.pati.cadastro.cliente.cadastrocliente.entidade.Cliente;

@RestController
public class ClienteController {


	private List<Cliente> repository;
	
	{
		repository = new ArrayList<Cliente>();
		repository.add(new Cliente(1, "Teste_1", "111.444.777-35", "telefone", "email","cep","rua","bairro","cidade","estado"));
		repository.add(new Cliente(2, "Teste_2", "222.555.888-41", "telefone", "email","cep","rua","bairro","cidade","estado"));
	}


	@GetMapping("/clientes")
	public List<Cliente> all() {
		return repository;
	}

	@PostMapping("/cliente/novo")
	public Integer novo(@RequestBody Cliente cliente) {
		Integer maiorId = 0;
		for (Cliente c : repository) {
			if(maiorId < c.getId()) {
				maiorId = c.getId();
			}
		}
		cliente.setId(maiorId+1);
		repository.add(cliente);
		return cliente.getId();
	}

	@GetMapping("/cliente/excluir/{id}")
	public Integer excluir(@PathVariable Integer id) {
		Cliente remover = null;
		for (Cliente cliente : repository) {
			if(id.equals(cliente.getId())) {
				remover = cliente;
			}
		}
		repository.remove(remover);

		return remover.getId();
	}


}
