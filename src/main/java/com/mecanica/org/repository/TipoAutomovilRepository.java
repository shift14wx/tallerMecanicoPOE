package com.mecanica.org.repository;

import com.mecanica.org.domain.TipoAutomovil;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TipoAutomovil entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoAutomovilRepository extends JpaRepository<TipoAutomovil, Long> {
}
