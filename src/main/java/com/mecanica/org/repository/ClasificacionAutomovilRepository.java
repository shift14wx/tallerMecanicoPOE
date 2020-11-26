package com.mecanica.org.repository;

import com.mecanica.org.domain.ClasificacionAutomovil;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ClasificacionAutomovil entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClasificacionAutomovilRepository extends JpaRepository<ClasificacionAutomovil, Long> {
}
