package com.mecanica.org.repository;

import com.mecanica.org.domain.Automovil;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Automovil entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AutomovilRepository extends JpaRepository<Automovil, Long> {
}
