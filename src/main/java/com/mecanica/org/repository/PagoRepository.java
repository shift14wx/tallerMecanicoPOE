package com.mecanica.org.repository;

import com.mecanica.org.domain.Pago;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Pago entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {

    List<Pago> findByAveriaId(Long idAveria);
}
