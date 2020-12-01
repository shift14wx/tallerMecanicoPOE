package com.mecanica.org.repository;

import com.mecanica.org.domain.Automovil;

import com.mecanica.org.domain.Cliente;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Automovil entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AutomovilRepository extends JpaRepository<Automovil, Long> {
    public List<Automovil> findByClienteId(Long idCliente);
}
