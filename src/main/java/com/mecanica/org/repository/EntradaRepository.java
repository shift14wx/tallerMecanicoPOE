package com.mecanica.org.repository;

import com.mecanica.org.domain.Entrada;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Entrada entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntradaRepository extends JpaRepository<Entrada, Long> {
    List<Entrada> findByAveriaId(Long id );
}
