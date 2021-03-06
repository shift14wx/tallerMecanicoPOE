package com.mecanica.org.repository;

import com.mecanica.org.domain.BitacoraAveria;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the BitacoraAveria entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BitacoraAveriaRepository extends JpaRepository<BitacoraAveria, Long> {
}
