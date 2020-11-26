package com.mecanica.org.repository;

import com.mecanica.org.domain.EstadoAveria;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the EstadoAveria entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoAveriaRepository extends JpaRepository<EstadoAveria, Long> {
}
