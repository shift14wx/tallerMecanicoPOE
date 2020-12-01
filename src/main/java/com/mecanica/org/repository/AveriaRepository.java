package com.mecanica.org.repository;

import com.mecanica.org.domain.Averia;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Averia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AveriaRepository extends JpaRepository<Averia, Long> {

    List<Averia> findByAutomovilId( Long idAutomovil );

}
