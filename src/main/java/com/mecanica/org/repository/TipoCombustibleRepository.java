package com.mecanica.org.repository;

import com.mecanica.org.domain.TipoCombustible;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TipoCombustible entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoCombustibleRepository extends JpaRepository<TipoCombustible, Long> {
}
